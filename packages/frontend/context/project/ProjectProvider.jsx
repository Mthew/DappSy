import { createContext, useReducer, useEffect } from "react";

import { axios } from "../../utils";
import { projectReducer, projectInitialState } from "./ProjectReducer";

export const ProjectContext = createContext({});

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, projectInitialState);

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

  const createProject = async (data) => {
    const result = await axios.post(`/project`, data);

    if (result.data) {
      dispatch({ type: "PROJECTS-UPDATE", payload: result.data });
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        ...state,

        //methods
        getProjects,
        createProject,
        addTokens: () => {},
        lessTokens:() => {}, 
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
