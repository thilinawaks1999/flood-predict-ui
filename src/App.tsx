import React, { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { loadHomeData } from "./redux/slice/homeReducer";
import Form from "./components/Form";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadHomeData({ id: 1 }));
  }, [dispatch]);

  return <Form />;
}

export default App;
