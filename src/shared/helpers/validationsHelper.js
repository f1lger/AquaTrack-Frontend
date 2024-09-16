export const isNumber = (event, setErr) => {
  const charCode = event.which ? event.which : event.keyCode;
  if (
    (charCode < 48 || charCode > 57) &&
    charCode !== 8 &&
    charCode !== 13 &&
    (charCode < 37 || charCode > 40)
  ) {
    setErr(true);
    event.preventDefault();
  } else {
    setErr(false);
  }
};

export const timeInputController = (event, setTimeErr) => {
  const value = event.target.value;
  if (
    !/^[0-2]$|^[0-2][0-3]$|^[0-2][0-3]:$|^[0-2][0-3]:[0-5]$|^[0-2][0-3]:[0-5]\d$/.test(
      value
    )
  ) {
    setTimeErr(true);
    event.preventDefault();
  } else {
    setTimeErr(false);
  }
};

export const getFormattedTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const parseTimeToUnix = (time, date) => {
  const [hours, minutes] = time.split(":").map(Number);
  let activeDate;

  if (date) {
    activeDate = new Date(date);
  } else {
    activeDate = new Date();
  }

  activeDate.setHours(hours);
  activeDate.setMinutes(minutes);
  activeDate.setSeconds(0);
  activeDate.setMilliseconds(0);
  return activeDate.getTime();
};

export const unixParser = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const maxNumber = ({ target }, setError, setValue, clearErrors) => {
  const { value, max, name } = target;
  if (Number(value) > Number(max)) {
    switch (name) {
      case "liters":
        setError("liters", { type: "max", message: "Maximum 10 liters" });
        break;
      case "activeTime":
        setError("activeTime", { type: "max", message: "Maximum 24 hours" });
        break;
      case "weight":
        setError("weight", { type: "max", message: "Maximum 150 kg" });
        break;
    }
    setValue(`${name}`, max);
  } else {
    switch (name) {
      case "liters":
        clearErrors("liters");
        break;
      case "activeTime":
        clearErrors("activeTime");
        break;
      case "weight":
        clearErrors("weight");
        break;
    }
    setValue(`${name}`, value);
  }
};

export const isNumberAndDot = (event, setError, clearErrors) => {
  const name = event.target.name;
  const charCode = event.which ? event.which : event.keyCode;
  if (
    (charCode < 48 || charCode > 57) &&
    charCode !== 8 &&
    charCode !== 13 &&
    charCode !== 190 &&
    charCode !== 110 &&
    charCode !== 188 &&
    (charCode < 37 || charCode > 40)
  ) {
    switch (name) {
      case "liters":
        setError("liters", {
          type: "valueAsNumber",
          message: "Type only number",
        });
        break;
      case "activeTime":
        setError("activeTime", {
          type: "valueAsNumber",
          message: "Type only number",
        });
        break;
      case "weight":
        setError("weight", {
          type: "valueAsNumber",
          message: "Type only number",
        });
        break;
    }
    event.preventDefault();
  } else {
    switch (name) {
      case "liters":
        clearErrors("liters");
        break;
      case "activeTime":
        clearErrors("activeTime");
        break;
      case "weight":
        clearErrors("weight");
        break;
    }
  }
};
