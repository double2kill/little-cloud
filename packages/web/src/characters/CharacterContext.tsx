import { createContext, useContext, type ReactNode } from "react";
import type { CharacterConfig } from "./types";

const CharacterContext = createContext<CharacterConfig | null>(null);

export function CharacterProvider({
  config,
  children,
}: {
  config: CharacterConfig;
  children: ReactNode;
}) {
  return (
    <CharacterContext.Provider value={config}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter(): CharacterConfig {
  const config = useContext(CharacterContext);
  if (!config) {
    throw new Error("useCharacter must be used within CharacterProvider");
  }
  return config;
}
