/* eslint-disable */
import * as E from "fp-ts/lib/Either";
import * as TE from "fp-ts/lib/TaskEither";


import * as t from "io-ts";

export type MyError =
  | { type: "NetError"; message: string }
  | { type: "DecodeError"; message: string };

export function netError(e: Error): MyError {
  return {
    type: "NetError",
    message: e.message
  };
}

export function decodeError(e: t.Errors): MyError {
  const missingKeys = e.map(e => e.context.map(({ key }) => key).join("."));
  return {
    type: "DecodeError",
    message: `${missingKeys}`
  };
}

export function httpRequest(u: string): TE.TaskEither<Error, unknown> {
  return TE.tryCatch(
    () =>
      fetch(u).then(res => {
        if (!res.ok) {
          throw new Error(`fetch failed with status: ${res.status}`);
        }
        return res.json();
      }),
    E.toError
  );
}

