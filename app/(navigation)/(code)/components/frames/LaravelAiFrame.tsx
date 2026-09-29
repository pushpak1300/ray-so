import classNames from "classnames";
import { useAtom, useAtomValue } from "jotai";

import { fileNameAtom, showBackgroundAtom } from "../../store";
import { paddingAtom } from "../../store/padding";
import { themeDarkModeAtom } from "../../store/themes";

import McpLogo from "../../assets/laravel-mcp.svg";
import SparkleLogo from "../../assets/laravel-ai.svg";
import Editor from "../Editor";
import sharedStyles from "./DefaultFrame.module.css";
import styles from "./LaravelAiFrame.module.css";

/* Silk waves from laravel.com/ai's hero, as ASCII (Firecrawl-style texture); generated from three layered sines */
const WAVES = `                         .......                              ......                               ......
:..                ...:-=+++++++=-:...              ....::-=+++++++++=-:..                   ..::-=+++++++=--:
++++++=-:... ..:=+++++++=--::::::::=++-:.......::=++++++++++++++=-:::.::=++-:...        ..::-++-::....:=++++++
:-++++++++++++++++++++=====++++==-::-=+++++++++++++++++-:.....:::-=+=-::..:::-++==----==+=-:....:-++++++++++++
..:-+++++++++++++++-::........::-+++++++++++++=::...               ..::-++=-::::-----::::--+++++++++++-:....
+=-::...       ...::-=++++===+++++=-:::::::-=++-::...                    ..::-=++++++++++++++++=:.
.                     ...........            ...:-=++==-::.......      ......:-=++++++++-:..
                                                    ...::--=++++++====+++++==-:::...`;

const LaravelAiFrame = ({ variant }: { variant: "ai" | "mcp" }) => {
  const darkMode = useAtomValue(themeDarkModeAtom);
  const [padding] = useAtom(paddingAtom);
  const [showBackground] = useAtom(showBackgroundAtom);
  const [fileName, setFileName] = useAtom(fileNameAtom);

  return (
    <div
      className={classNames(
        sharedStyles.frame,
        styles.frame,
        styles[variant],
        !darkMode && styles.frameLightMode,
        !showBackground && sharedStyles.noBackground,
        !showBackground && styles.noBackground,
      )}
      style={{ padding }}
    >
      {!showBackground && <div data-ignore-in-export className={sharedStyles.transparentPattern}></div>}
      {variant === "ai" && showBackground && (
        <div className={styles.wavesContainer}>
          <pre className={styles.waves}>{WAVES}</pre>
        </div>
      )}
      <div className={styles.window}>
        {/* Guide lines along the window edges: flush with sparkles for AI, offset and fading (Tailwind-style) for MCP */}
        <span className={styles.guidesHorizontal} data-grid></span>
        <span className={styles.guidesVertical} data-grid></span>
        {variant === "ai" &&
          ["topLeft", "topRight", "bottomLeft", "bottomRight"].map((corner) => (
            <span key={corner} className={classNames(styles.corner, styles[corner])} data-grid>
              <SparkleLogo />
            </span>
          ))}
        {/* MCP: a signal travelling the bottom guide */}
        {variant === "mcp" && <span className={classNames(styles.signal, styles.signalBottom)} data-grid></span>}
        {variant === "mcp" && (
          <div className={styles.header}>
            <McpLogo className={styles.mark} />
            <div className={classNames(sharedStyles.fileName, styles.fileName)}>
              <input
                type="text"
                value={fileName}
                onChange={(event) => setFileName(event.target.value)}
                spellCheck={false}
                tabIndex={-1}
              />
              {fileName.length === 0 ? <span data-ignore-in-export>Untitled-1</span> : null}
            </div>
          </div>
        )}
        <Editor />
      </div>
    </div>
  );
};

export default LaravelAiFrame;
