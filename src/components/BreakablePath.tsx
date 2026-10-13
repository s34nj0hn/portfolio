import { Fragment } from "react";

export function BreakablePath({ text }: { text: string }) {
  const parts = text.split("/");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              <wbr />/
            </>
          )}
          {p}
        </Fragment>
      ))}
    </>
  );
}
