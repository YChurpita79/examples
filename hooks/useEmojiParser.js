/* eslint-disable no-useless-escape */
import { EMOJI_KEYBOARD_SHORTCUTS } from "constants/emoji";

export const useEmojiParser = () => {
  const operator = (hex) => {
    return parseInt(hex, 16);
  };
  return (string) => {
    try {
      for (const key in EMOJI_KEYBOARD_SHORTCUTS) {
        const keyBeforeEmoji = string.length > key.length ? string[string.indexOf(key) - 1] : " ";
        const isSpaceBefore = keyBeforeEmoji === " ";
        const isThisEmoji = string.includes(key) && isSpaceBefore;

        if (isThisEmoji) {
          const codepoint = operator(EMOJI_KEYBOARD_SHORTCUTS[key]);
          const emojiGlyph = String.fromCodePoint(codepoint);
          return string.replaceAll(`${key}`, emojiGlyph);
        }
      }
      return string;
    } catch (e) {
      console.warn(e);
    }
  };
};
