export interface RustApp {
  grayscale(encoded_file: string): string
  blur(encoded_file: string, sigma: number): string
  brighten(encoded_file: string, value: number): string
  fliph(encoded_file: string): string
  rotate90(encoded_file: string): string
}
