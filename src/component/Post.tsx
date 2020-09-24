import React, { ReactElement } from "react";
import { APost } from "../container/PostContainer";

export const Post = (title: string): ReactElement<APost> => {
  // const { title, body } = props;

  return (
    <>
      <h3>{title}</h3>
      {/*<p>{body}</p>*/}
    </>
  )

}
