args <- commandArgs(trailingOnly = TRUE)
script_path <- args[1]
output_prefix <- args[2]

cat("🔄 Running script:", script_path, "\n")
source(script_path)

if (file.exists("output.html")) {
  final_html <- paste0(output_prefix, ".html")
  cat("✅ Copying output.html to", final_html, "\n")
  file.copy("output.html", final_html, overwrite = TRUE)
} else if (file.exists("output.png")) {
  final_png <- paste0(output_prefix, ".png")
  cat("✅ Copying output.png to", final_png, "\n")
  file.copy("output.png", final_png, overwrite = TRUE)
} else {
  stop("❌ Expected output file was not found.")
}
