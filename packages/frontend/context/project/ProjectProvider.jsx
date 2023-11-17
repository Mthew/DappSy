import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import {
  useContractWrite,
  useAccount,
  usePrepareContractWrite,
  useContractEvent,
} from "wagmi";

import { axios, nextNumber, showError } from "../../utils";
import { projectReducer, projectInitialState } from "./ProjectReducer";
import { ProfileContext } from "../";

import DappsyContractABI from "../../contracts/Dappsy";

import { showSuccess, getDate } from "../../utils";
import { parseEther } from "@ethersproject/units";

const CONTRACT_ADDRESS = "0x5F625fF2e423024c52614c54Dbc78dd80cDf88aA";

const generateteProjectKey = nextNumber();

const calculateTokenCost = (cost, quantity) => {
  if (quantity == 0) throw new Error("Erorr division por 0");

  return parseEther(String(cost / quantity));
};

export const useTranferTokens = ({ projectKey }) => {
  const [tokensToSell, setTokensToSell] = useState(0);
  const [tokenCost, setTokenCost] = useState(0);

  const { saveTansactionOnDatabase } = useProject();
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: DappsyContractABI.output.abi,
    functionName: "transfer",
    overrides: {
      gasLimit: 1000000,
      value: parseEther(String(tokenCost)),
    },
    args: [projectKey, tokensToSell],
    enabled: tokensToSell > 0,
    onError: (err) => console.log("ERROR al conectarse", err),
    onSuccess: (result) => console.log("SUCCESS", result),
  });

  const { writeAsync } = useContractWrite(config);

  const mint = async (projectId) => {
    if (!isConnected) {
      showError("Wallet sin conexion");
    }
    console.log("DATATATAA====>", projectKey, tokensToSell);
    writeAsync?.()
      .then(() => {
        saveTansactionOnDatabase(projectId);
      })
      .catch(() => {
        showError("Se genero un error al intentar comprar tokens");
      });
  };

  return {
    mint,
    setTokensToSell,
    setTokenCost,
  };
};

export const ProjectContext = createContext({});

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [contractArgs, setContractArgs] = useState([]);

  const [state, dispatch] = useReducer(projectReducer, projectInitialState);
  const { profile, setProfile } = useContext(ProfileContext);
  const { isConnected } = useAccount();

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: DappsyContractABI.output.abi,
    eventName: "Add",
    listener(log) {
      console.log("ADDD=>", log);
    },
  });

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: DappsyContractABI.output.abi,
    eventName: "Transfer",
    listener(log) {
      console.log("TRANSFER=>", log);
    },
  });

  const { config, error, isError } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    overrides: {
      gasLimit: 1000000,
    },
    contractInterface: DappsyContractABI.output.abi,
    functionName: "createProject",
    args: contractArgs, // String(BigInt(debouncedFormData.initialMintAmount) * BigInt(10 ** 18)),
    onError: (err) => console.log("ERROR al conectarse", err),
    onSuccess: (result) => console.log("SUCCESS", result),
    onSettled: (result) => console.log("SETTLED", result),
  });

  const { data, writeAsync, isLoading, isSuccess } = useContractWrite(config);

  useEffect(() => {
    console.log(
      "ENTRO PPOR AQUI NO DEJO RASTROS NI ROSTROS",
      isLoading,
      isSuccess
    );
  }, [isSuccess]);

  useEffect(() => {
    try {
      getProjects();
    } catch (error) {
      dispatch({ type: "PROJECTS-SET", payload: [] });
    }
  }, []);

  const getProjects = async () => {
    const result = await axios.get(`/project`);
    if (result.data) {
      dispatch({ type: "PROJECTS-SET", payload: result.data });
    }
  };

  const createProject = async (data, callback) => {
    if (!isConnected) {
      showError("Wallet sin conexion");
    }

    const tokenAmount = calculateTokenCost(data.cost, data.tokenCount);
    const projectKey = generateteProjectKey();
    setContractArgs([projectKey, data.tokenCount, tokenAmount]);
    console.log("PARAM=>", [projectKey, data.tokenCount, tokenAmount]);

    writeAsync?.()
      .then((inf) => {
        console.log("INFORMACION", inf);
        createOnDatabase({ ...data, projectKey }, callback);
      })
      .catch(() =>
        showError(
          "Se genero un error al crear el contrato, por favor vuelva hacer clic sobre le boton guardar"
        )
      );
  };

  const createOnDatabase = async (data, callback) => {
    console.log("DATA", data);
    data.creationDate = getDate();
    data.owner = {
      userId: profile.id,
      name: profile.name,
      profilePhoto: profile.img,
    };

    const result = await axios.post(`/project`, data);

    if (result.data) {
      dispatch({ type: "PROJECTS-ADD", payload: result.data });

      callback && callback();
    }
  };

  const saveTansactionOnDatabase = async (projectId, tokensToSell) => {
    const data = {
      tokenCount: tokensToSell,
      projectId: projectId,
      userId: profile.id,
    };
    console.log("DATA TO TRANFERED PROJECT =>", data);
    const result = await axios.put(`/project`, data);
    if (result.data) {
      dispatch({ type: "PROJECTS-UPDATE", payload: result.data.project });
      setProfile(result.data.user);
      showSuccess("¡Tokens adquiridos con exito!");

      //ACTUALIZAR LA LISTA DE OWNER EN LA PANTALLA DE PROJECT-PREVIEW
      //PROBAR FUNCIONALIDAD
      //ACTUALiZAR LA LISTA DE TOKENS EN LA PANTALLA DE PERFIL
    }
  };

  const getProjectById = (projectId) => {
    return state.projects.find((project) => project.id === projectId);
  };

  const setCurrentProject = (project) => {
    dispatch({ type: "PROJECTS-SET-CURRENT", payload: project });
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,

        //methods
        getProjects,
        createProject,
        getProjectById,
        setCurrentProject,
        contractIsLoading: isLoading,
        contractIsSuccess: isSuccess,
        contractData: data,
        contractisError: isError,
        contractError: error,
        saveTansactionOnDatabase,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
