import React, { useState } from "react";
import * as firebase from "firebase/app";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";

interface Props {
  id: string;
  title: string;
}

const TaksItem: React.FC<Props> = (props) => {
  const [title, setTitle] = useState(props.title);

  //編集用のinputの中身
  const onChangeEditInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTitle(e.target.value);
  };

  //編集用
  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };

  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };

  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justify="flex-end">
        <TextField
          label="Edit task"
          value={title}
          onChange={onChangeEditInput}
        ></TextField>
      </Grid>
      <button onClick={editTask} className={styles.task_item_icon}>
        <EditOutlinedIcon />
      </button>
      <button onClick={deleteTask} className={styles.task_item_icon}>
        <DeleteOutlineOutlinedIcon />
      </button>
    </ListItem>
  );
};

export default TaksItem;
