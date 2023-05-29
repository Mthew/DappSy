import { createContext, useReducer, useEffect, useContext } from "react";

import { axios } from "../../utils";
import { projectReducer, projectInitialState } from "./ProjectReducer";
import { ProfileContext } from "../";

import { showSuccess, getDate } from "../../utils";

import { useMessageSigner } from "../../hooks";

export const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, projectInitialState);
  const { profile, setProfile } = useContext(ProfileContext);
  const { showSignerMessage } = useMessageSigner();

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
    data.creationDate = getDate();
    data.owner = {
      userId: profile.id,
      name: profile.name,
      profilePhoto: profile.img,
    };

    showSignerMessage(
      `Al guardar, esta creando un contrato inteligente que representa un proyecto inmobiliario. ¿Esta seguro de realizar esta acción?`,
      async () => {
        const result = await axios.post(`/project`, data);

        if (result.data) {
          dispatch({ type: "PROJECTS-ADD", payload: result.data });
          callback && callback();
        }
      }
    );
  };

  const getProjectById = (projectId) => {
    return state.projects.find((project) => project.id === projectId);
  };

  const setCurrentProject = (project) => {
    dispatch({ type: "PROJECTS-SET-CURRENT", payload: project });
  };

  const mint = async (projectId, tokenCount) => {
    const data = {
      tokenCount,
      projectId,
      userId: profile.id,
    };
    const result = await axios.put(`/project`, data);
    if (result.data) {
      dispatch({ type: "PROJECTS-UPDATE", payload: result.data.project });
      setProfile(result.data.user);
      showSuccess("¡Tokens adquiridos con exito!");

      //ACTUALIZAR LA LISTA DE OWNER EN LA PANTALLA DE PROJECT-PREVIEW
      //PROBAR FUNCIONALIDAD
      //ACTUALOZAR LA LISTA DE TOKENS EN LA PANTALLA DE PERFIL
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,

        //methods
        getProjects,
        createProject,
        getProjectById,
        mint,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
