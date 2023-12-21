import useNavigation from "../hooks/use-navigation";

function Route ({path, children}) {

  // destructuring the currentPath from the context object
  const { currentPath } = useNavigation();

  return currentPath === path ? children : null;
};

export default Route;