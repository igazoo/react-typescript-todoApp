import { FormControl, TextField, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
//firebaseのdbにアクセス
import { db } from "./firebase";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TaksItem from "./TaksItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBotom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  //入力データのstate
  const [input, setInput] = useState("");

  const classes = useStyles();

  //dbのデータを取得
  //firebaseのデータを扱う時、snapshotというメソッドを使う
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);

  const onChangeInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };

  const newTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    db.collection("tasks").add({ title: input }); //input stateの文字列を保存
    setInput(""); //inputの初期化
  };

  return (
    <div className={styles.app_root}>
      <h1>Todo App by React/FireBase</h1>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          label="New task"
          value={input}
          onChange={onChangeInput}
        ></TextField>
      </FormControl>
      <button disabled={!input} onClick={newTask} className={styles.app_icon}>
        <AddToPhotosIcon />
      </button>

      <List className={classes.list}>
        {tasks.map((task) => (
          <TaksItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
