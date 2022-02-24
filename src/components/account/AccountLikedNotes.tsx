import React from "react";
import { NoteType } from "../../utils/types/modelTypes";
import ErrorCard from "../../styles/styledComponents/Cards/ErrorCard";
import Note from "../cards/Note";
import styles from "../../styles/account/_account.module.scss";

const AccountLikedNotesList: React.FC<{
  notes: NoteType[];
  errMsg: string;
}> = ({ notes, errMsg }) => {
  return (
    <div className={styles.postsContainer}>
      {notes.length ? (
        notes.map((note: NoteType) => <Note note={note} key={note._id} />)
      ) : (
        <ErrorCard className="w-100 mb-2">{errMsg}</ErrorCard>
      )}
    </div>
  );
};

export default AccountLikedNotesList;
