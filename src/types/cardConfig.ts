export type CardConfig = {
  background: string | "gradient" | "image"
  backgroundValue: string

  titleColor: string
  bodyColor: string

  showDay: boolean

  titleSize: number
  bodySize: number

  align: "left" | "center"
}
