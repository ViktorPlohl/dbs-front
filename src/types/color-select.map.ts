import { Color } from './color';
import { ColorOptionEnum } from './color-option.enum';

export const ColorSelectMap = new Map<ColorOptionEnum, Color[]>([
  [ColorOptionEnum.RED, [Color.RED]],
  [ColorOptionEnum.BLUE, [Color.BLUE]],
  [ColorOptionEnum.GREEN, [Color.GREEN]],
  [ColorOptionEnum.YELLOW, [Color.YELLOW]],
  [ColorOptionEnum.BLACK, [Color.BLACK]],
  [ColorOptionEnum.RED_GREEN, [Color.RED, Color.GREEN]],
  [ColorOptionEnum.RED_YELLOW, [Color.RED, Color.YELLOW]],
  [ColorOptionEnum.RED_BLUE, [Color.RED, Color.BLUE]],
  [ColorOptionEnum.BLUE_YELLOW, [Color.BLUE, Color.YELLOW]],
  [ColorOptionEnum.BLUE_GREEN, [Color.BLUE, Color.GREEN]],
  [ColorOptionEnum.GREEN_YELLOW, [Color.GREEN, Color.YELLOW]],
]);
