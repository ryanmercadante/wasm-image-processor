export interface RustApp {
  grayscale(encoded_file: string): string
  blur(encoded_file: string, sigma: number): string
}
