// src/reportWebVitals.ts
import { type Metric } from "web-vitals";
import { onCLS } from "web-vitals/dist/modules/onCLS";
// import { onFID } from "web-vitals/dist/modules/onFID";
import { onFCP } from "web-vitals/dist/modules/onFCP";
import { onLCP } from "web-vitals/dist/modules/onLCP";
import { onTTFB } from "web-vitals/dist/modules/onTTFB";

type ReportHandler = (metric: Metric) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
	if (onPerfEntry && typeof onPerfEntry === "function") {
		onCLS(onPerfEntry);
		// onFID(onPerfEntry);
		onFCP(onPerfEntry);
		onLCP(onPerfEntry);
		onTTFB(onPerfEntry);
	}
};

export default reportWebVitals;
