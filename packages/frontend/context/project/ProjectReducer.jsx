export const projectInitialState = {
  projects: [],
};

/**
 *
 * @param {projectInitialState} state
 * @param {{type: "PROJECTS-SET" | "PROJECTS-UPDATE", payload: any}} action
 */
export const projectReducer = (state, action) => {
  switch (action.type) {
    case "PROJECTS-SET":
      return {
        ...state,
        projects: action.payload,
      };
    case "PROJECTS-UPDATE":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    default:
      return state;
  }
};
