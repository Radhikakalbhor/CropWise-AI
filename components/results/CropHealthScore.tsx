interface Props {
  disease: string;
  confidence: string;
}

export default function CropHealthScore({
  disease,
  confidence,
}: Props) {
  let score = 70;

  const diseaseText = disease.toLowerCase();
  const confidenceText = confidence.toLowerCase();

  if (diseaseText.includes("healthy")) {
    score =
      confidenceText.includes("high") ? 98 : 92;
  } else if (
    diseaseText.includes("low risk")
  ) {
    score =
      confidenceText.includes("high") ? 88 : 82;
  } else {
    if (confidenceText.includes("high")) score = 35;
    else if (confidenceText.includes("medium")) score = 55;
    else score = 70;
  }

  let status = "Good";
  let color = "bg-green-600";

  if (score >= 95) {
    status = "Excellent";
    color = "bg-green-600";
  } else if (score >= 80) {
    status = "Healthy";
    color = "bg-lime-500";
  } else if (score >= 60) {
    status = "Monitor";
    color = "bg-yellow-500";
  } else {
    status = "Critical";
    color = "bg-red-600";
  }

  return (
    <div className="mb-10 rounded-3xl bg-white p-8 shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase text-green-600">
            Crop Health Score
          </p>

          <h2 className="mt-2 text-5xl font-extrabold">
            {score}/100
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            {status}
          </p>

        </div>

        <div className="text-7xl">
          🌱
        </div>

      </div>

      <div className="mt-8 h-5 overflow-hidden rounded-full bg-gray-200">

        <div
          className={`${color} h-full transition-all duration-700`}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}