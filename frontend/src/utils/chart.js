/**
 * Utils for chart
 *
 *
 */
import { OS_VALUE } from "constants";
const normalizeChartData = (canvas, data, reference, title) => {
  if (!data || data.length === 0) {
    return;
  }
  let labels = [];
  let labelColors = [];
  let presetData = [];
  reference.map((status) => {
    const tickets = data.filter((ticket) => ticket.status === status.value);

    if (tickets.length > 0) {
      labels.push(`${status.label} (${tickets.length})`);
      labelColors.push(status.labelColor.basic);
      presetData.push(tickets.length);
    }
  });
  // ['#FF6384', '#36A2EB', '#FFCE56', '#FABE11']
  if (!canvas) {
    return {
      datasets: [
        {
          title,
          labels,
          data: presetData,
          backgroundColor: labelColors,
        },
      ],
    };
  }

  return {
    datasets: [
      {
        title,
        labels,
        data: presetData,
        backgroundColor: labelColors,
      },
    ],
  };
};

const normalizeDeviceData = (
  canvas,
  data,
  reference,
  osReferences,
  statusTitle,
  OStitle
) => {
  if (!data || data.length === 0) {
    return;
  }
  let labels = [];
  let labelColors = [];
  let labelGradientColors = [];
  let presetData = [];
  reference.map((status) => {
    const tickets = data.filter(({ expireValue }) => {
      return expireValue === status.value;
    });
    if (tickets.length > 0) {
      labels.push(`${status.label} (${tickets.length})`);
      labelColors.push(status.labelColor.classColor);
      labelGradientColors.push(status.labelColor.gradient);
      presetData.push(tickets.length);
    }
  });
  let osLabels = [];
  let oslabelColors = [];
  let oslabelGradientColors = [];
  let ospresetData = [];
  osReferences.map((status) => {
    const tickets = data.filter((device) => {
      if (status.value === "unknown") {
        return (
          !device.supportOsExpireValue ||
          device.supportOsExpireValue === status.value
        );
      }
      return device.supportOsExpireValue === status.value;
    });
    if (tickets.length > 0) {
      osLabels.push(`${status.label} (${tickets.length})`);
      oslabelColors.push(status.labelColor.classColor);
      oslabelGradientColors.push(status.labelColor.gradient);
      ospresetData.push(tickets.length);
    }
  });
  if (!canvas)
    return {
      datasets: [
        {
          title: statusTitle,
          labels,
          data: presetData,
          backgroundColor: labelColors,
        },
        {
          title: OStitle,
          labels: osLabels,
          data: ospresetData,
          backgroundColor: oslabelColors,
        },
      ],
    };
  let ctx = canvas.getContext("2d");
  let gradients = [];
  let osGradients = [];
  labelGradientColors.forEach(function (item) {
    let gradient = ctx.createLinearGradient(120, 0, 170, 0);
    gradient.addColorStop(0, item.start);
    gradient.addColorStop(1, item.end);
    gradients.push(gradient);
  });
  oslabelGradientColors.forEach(function (item) {
    let gradient = ctx.createLinearGradient(120, 0, 170, 0);
    gradient.addColorStop(0, item.start);
    gradient.addColorStop(1, item.end);
    osGradients.push(gradient);
  });
  return {
    datasets: [
      {
        title: statusTitle,
        labels,
        data: presetData,
        backgroundColor: gradients,
      },
      {
        title: OStitle,
        labels: osLabels,
        data: ospresetData,
        backgroundColor: osGradients,
      },
    ],
  };
};

export default {
  normalizeChartData,
  normalizeDeviceData,
};
