/* eslint-disable */
import React, { useEffect } from "react";
import { decodeError, httpRequest, MyError, netError } from "../httpRequest";
import { pipe } from "fp-ts/lib/pipeable";
import * as TE from "fp-ts/lib/TaskEither";
import * as T from "fp-ts/lib/Task";
import { Post } from "../component/Post";
import * as t from "io-ts";

const PostCodec = t.type({
  userId: t.number,
  id: t.number,
  title: t.string,
  body: t.string
})

export type APost = t.TypeOf<typeof PostCodec>;

const validate = (res: unknown): TE.TaskEither<MyError, APost> => {
  return pipe(
    TE.fromEither(PostCodec.decode(res)),
    TE.mapLeft(decodeError)
  );
}

const TaskEitherAndValidateCorrect: T.Task<JSX.Element> = pipe(
  httpRequest(
    "https://jsonplaceholder.typicode.com/posts/1"
  ),
  TE.mapLeft(e => netError(e)),
  TE.chain(validate),
  TE.map(post => post.title), // for better display of data, also note the auto completion
  TE.fold(
    e => T.of(<p>error {e}</p>),
    post => T.of(Post(post))
  )
);

export const PostContainer: React.FC = () => {
  const [data, setData] = React.useState<JSX.Element>(<></>);

  useEffect(() => {
    TaskEitherAndValidateCorrect().then(post => setData(post))
  }, []);

  return (
    <div>
      <div>{data}</div>
    </div>
  );
}
