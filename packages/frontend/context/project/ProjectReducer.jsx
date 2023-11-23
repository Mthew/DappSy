export const projectInitialState = {
  projects: [],
  currentProject: null,
};

/**
 *
 * @param {projectInitialState} state
 * @param {{type: "PROJECTS-SET" | "PROJECTS-UPDATE" | "PROJECTS-ADD" | "PROJECTS-SET-CURRENT", payload: any}} action
 */
export const projectReducer = (state, action) => {
  switch (action.type) {
    case "PROJECTS-SET":
      return {
        ...state,
        projects: action.payload,
      };
    case "PROJECTS-ADD":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case "PROJECTS-UPDATE":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.id ? action.payload : project
        ),
        currentProject: action.payload,
      };
    case "PROJECTS-SET-CURRENT":
      return {
        ...state,
        currentProject: state.projects.find((x) => x.id === action.payload),
      };
    default:
      return state;
  }
};
