import { jsPDF } from "jspdf";

export function generatePDF(aiResult: any) {
  const doc = new jsPDF();

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("CropWise AI Report", 20, y);

  y += 12;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    20,
    y
  );

  y += 18;

  function section(title: string, value: string) {
    doc.setFont("helvetica", "bold");
    doc.text(title, 20, y);

    y += 7;

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(value || "-", 170);

    doc.text(lines, 20, y);

    y += lines.length * 7 + 6;
  }

  section("Disease", aiResult.disease);
  section("Confidence", aiResult.confidence);
  section("Fertilizer", aiResult.fertilizer);
  section("Irrigation", aiResult.irrigation);
  section("Pest Control", aiResult.pest_control);
  section("Weather", aiResult.weather_precautions);
  section("Prevention", aiResult.prevention);
  section("AI Reasoning", aiResult.reasoning);
  section("Explanation", aiResult.explanation);

  doc.save("CropWise_AI_Report.pdf");
}