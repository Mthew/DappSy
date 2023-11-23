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

import { axios, nextNumber, showError, showInfo } from "../../utils";
import { projectReducer, projectInitialState } from "./ProjectReducer";
import { ProfileContext, useNotification } from "../";

import DappsyContractABI from "../../contracts/Dappsy";

import { showSuccess, getDate } from "../../utils";
import { parseEther } from "@ethersproject/units";
import { useDebounce } from "../../hooks";

// const CONTRACT_ADDRESS = "0x5F625fF2e423024c52614c54Dbc78dd80cDf88aA";
// const CONTRACT_ADDRESS = "0x5A020F8522CBbF831949d40e6A029840c9201171";
const CONTRACT_ADDRESS = "0xEf4071b3F3633Cd7066edB0404F1c3b88E043728";

const TX_TYPE = {
  success: 1,
  fail: 0,
};

const generateteProjectKey = () => String(new Date().valueOf());

const calculateTokenCost = (cost, quantity) => {
  if (quantity == 0) throw new Error("Erorr division por 0");

  return parseEther(String(cost / quantity));
};

export const useTranferTokens = ({ projectKey }) => {
  const [tokensToSell, setTokensToSell] = useState(0);
  const [tokenCost, setTokenCost] = useState(0);
  const debouncedTokensToSell = useDebounce(tokensToSell, 500);
  const { notifyError, notifyInfo, notifySuccess } = useNotification();

  const { saveTansactionOnDatabase } = useProject();
  const { isConnected } = useAccount();

  const { config } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_projectKey",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokensToSell",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
    ],
    functionName: "transfer",
    overrides: {
      gasLimit: 1000000,
      value: String(parseEther(String(tokenCost))),
    },
    args: [String(projectKey), String(debouncedTokensToSell)],
    enabled: Boolean(debouncedTokensToSell),
    onError: (err) => console.log("ERROR al conectarse", err),
  });

  const { writeAsync } = useContractWrite(config);

  const mint = async (projectId) => {
    if (!isConnected) {
      showError("Wallet sin conexion");
    }
    console.log("DATATATAA====>", projectKey, tokensToSell);
    writeAsync?.()
      .then((tsx) => {
        // showInfo("TRANSACCION EN PROCESO");
        notifyInfo({
          title: "Transacción en proceso",
          duration: 15,
          message: (
            <>
              La transacción se encuentra siendo procesada en blockchain. <br />
              Por favor espere unso segundos mientras está es confirmada
              <br />
              <div className="text-blue bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <a
                  href={`https://sepolia.etherscan.io/tx/${tsx.hash}`}
                  target="_blank"
                >
                  Ver en Etherscan
                </a>
              </div>
            </>
          ),
        });

        tsx.wait().then((tsxValue) => {
          console.log("CONFIRMATION", tsxValue);

          switch (tsxValue.status) {
            case TX_TYPE.success: {
              // showSuccess(`Transacción confirmada; tokens adquiridos`);
              notifySuccess({
                title: "¡Transaccion confirmada!",
                duration: 30,
                message: (
                  <>
                    Felicidades, ahora formas parte como propietario de este
                    inmueble <br />
                    Aqui podra ver el contrato inteligente que lo respresenta,
                    como a tus socios propietarios:
                    <br />
                    <div className="text-blue bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      <a
                        href={`https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${projectKey}`}
                        target="_blank"
                      >
                        Ver en Etherscan
                      </a>
                    </div>
                  </>
                ),
              });
              saveTansactionOnDatabase(projectId, tokensToSell);
              break;
            }
            case TX_TYPE.fail: {
              showError("Transaccion fallida");
              // notifyError({
              //   title: `Transaccion fallida`,
              //   message: "Error al procesar la transaccion en blockchain",
              // });
              break;
            }
            default:
              break;
          }
        });
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
  const debouncedContractArgs = useDebounce(contractArgs, 500);

  const { notifyError, notifyInfo, notifySuccess } = useNotification();
  const [state, dispatch] = useReducer(projectReducer, projectInitialState);
  const { profile, setProfile } = useContext(ProfileContext);
  const { isConnected } = useAccount();

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: DappsyContractABI,
    eventName: "Add",
    listener(log) {
      console.log("ADDD=>", log);
    },
  });

  const { config, error, isError } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    overrides: {
      gasLimit: 1000000,
    },
    contractInterface: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "projectKey",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
        ],
        name: "createProject",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "createProject",
    args: debouncedContractArgs, // String(BigInt(debouncedFormData.initialMintAmount) * BigInt(10 ** 18)),
    enabled: Boolean(debouncedContractArgs),
    onError: (err) => console.log("ERROR al conectarse", err),
    // onSuccess: (result) => console.log("SUCCESS", result),
    // onSettled: (result) => console.log("SETTLED", result),
  });

  const { data, writeAsync, isLoading, isSuccess } = useContractWrite(config);

  useEffect(() => {
    try {
      getProjects();
    } catch (error) {
      dispatch({ type: "PROJECTS-SET", payload: [] });
    }
  }, []);

  useEffect(() => {}, [contractArgs]);

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

    const args = [
      String(projectKey),
      String(data.tokenCount),
      String(tokenAmount),
    ];
    setContractArgs(() => args);
    console.log("PARAMS=>", args);

    writeAsync?.()
      .then(async (txc) => {
        //`https://sepolia.etherscan.io/tx/${txc.hash}`

        notifyInfo({
          title: "Transacción en proceso",
          duration: 15,
          message: (
            <>
              La transacción se encuentra siendo procesada en blockchain. <br />
              Por favor espere unso segundos mientras está es confirmada
              <br />
              <div className="text-blue bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                <a
                  href={`https://sepolia.etherscan.io/tx/${txc.hash}`}
                  target="_blank"
                >
                  Ver en Etherscan
                </a>
              </div>
            </>
          ),
        });
        // showInfo(
        //   `transacción en proceso ${txc.hash}; Pendiente de confirmación`
        // );

        txc.wait().then((txcValue) => {
          console.log("CONFIRMATION", txcValue);

          switch (txcValue.status) {
            case TX_TYPE.success: {
              notifySuccess({
                title: "¡Transaccion confirmada!",
                message: (
                  <>
                    Felicidades, ha creado un nuevo proyecto disponible para la
                    venta. <br />
                    Aqui podra ver el contrato inteligente desplegado que
                    representa su proyecto inmobiliario:
                    <br />
                    <div className="text-blue bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      <a
                        href={`https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${contractArgs[0]}`}
                        target="_blank"
                      >
                        Ver en Etherscan
                      </a>
                    </div>
                  </>
                ),
              });

              // showSuccess(`Transacción confirmada`);
              createOnDatabase(
                { ...data, projectKey: contractArgs[0] },
                callback
              );
              setContractArgs([]);
              break;
            }
            case TX_TYPE.fail: {
              notifyError({
                title: `Transaccion fallida`,
                message: "Error al procesar la transaccion en blockchain",
              });
              // showError(`Transaccion fallida`);
              break;
            }
            default:
              break;
          }
        });
      })
      .catch((err) =>
        notifyError({
          title: `Transaccion fallida`,
          message:
            "Se genero un error al crear el contrato, por favor vuelva hacer clic sobre le boton guardar",
        })
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

  const setCurrentProject = (projectId) => {
    dispatch({ type: "PROJECTS-SET-CURRENT", payload: projectId });
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
        writeAsync,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
