import React from "react";
import { Field } from "formik";
import CheckboxImageInputField from "../../utils/formik/CheckboxImageInputField";
import artsImage from "../../images/artsInterest.png";
import cookingImage from "../../images/cookingInterests.png";
import diyImage from "../../images/diyInterest.png";
import educationImage from "../../images/educationInterest.png";
import fitnessImage from "../../images/fitnessInterest.png";
import hikingImage from "../../images/hikingInterest.png";
import historyImage from "../../images/historyInterest.png";
import itImage from "../../images/itInterest.png";
import literatureImage from "../../images/literatureInterest.png";
import musicImage from "../../images/musicInterest.png";
import politicsImage from "../../images/politicsInterest.png";
import scienceImage from "../../images/scienceInterest.png";
import sightseeingImage from "../../images/sightseeingInterest.png";
import sportsImage from "../../images/sportsInterest.png";
import technologiesImage from "../../images/technologiesInterest.png";
import travellingImage from "../../images/travellingInterest.png";
import yogaImage from "../../images/yogaInterest.png";

const InterestCategories: React.FC<{ name: string; values?: string[] }> = ({
  name,
  values,
}) => {
  return (
    <>
      <Field
        name={name}
        id="art"
        value="art"
        label="Art"
        isChecked={values && values.find((value: string) => value === "art")}
        component={CheckboxImageInputField}
      >
        <img src={artsImage} alt="" />
      </Field>
      <Field
        name={name}
        id="cooking"
        value="cooking"
        label="Cooking"
        isChecked={
          values && values.find((value: string) => value === "cooking")
        }
        component={CheckboxImageInputField}
      >
        <img src={cookingImage} alt="" />
      </Field>
      <Field
        name={name}
        id="diy"
        value="diy"
        label="DIY"
        isChecked={values && values.find((value: string) => value === "diy")}
        component={CheckboxImageInputField}
      >
        <img src={diyImage} alt="" />
      </Field>
      <Field
        name={name}
        id="education"
        value="education"
        label="Education"
        isChecked={
          values && values.find((value: string) => value === "education")
        }
        component={CheckboxImageInputField}
      >
        <img src={educationImage} alt="" />
      </Field>
      <Field
        name={name}
        id="fitness"
        value="fitness"
        label="Fitness"
        isChecked={
          values && values.find((value: string) => value === "fitness")
        }
        component={CheckboxImageInputField}
      >
        <img src={fitnessImage} alt="" />
      </Field>
      <Field
        name={name}
        id="hiking"
        value="hiking"
        label="Hiking"
        isChecked={values && values.find((value: string) => value === "hiking")}
        component={CheckboxImageInputField}
      >
        <img src={hikingImage} alt="" />
      </Field>
      <Field
        name={name}
        id="history"
        value="history"
        label="History"
        isChecked={
          values && values.find((value: string) => value === "history")
        }
        component={CheckboxImageInputField}
      >
        <img src={historyImage} alt="" />
      </Field>
      <Field
        name={name}
        id="it"
        value="it"
        label="IT"
        isChecked={values && values.find((value: string) => value === "it")}
        component={CheckboxImageInputField}
      >
        <img src={itImage} alt="" />
      </Field>
      <Field
        name={name}
        id="literature"
        value="literature"
        label="Literature"
        isChecked={
          values && values.find((value: string) => value === "literature")
        }
        component={CheckboxImageInputField}
      >
        <img src={literatureImage} alt="" />
      </Field>
      <Field
        name={name}
        id="music"
        value="music"
        label="Music"
        isChecked={values && values.find((value: string) => value === "music")}
        component={CheckboxImageInputField}
      >
        <img src={musicImage} alt="" />
      </Field>
      <Field
        name={name}
        id="politics"
        value="politics"
        label="Politics"
        isChecked={
          values && values.find((value: string) => value === "politics")
        }
        component={CheckboxImageInputField}
      >
        <img src={politicsImage} alt="" />
      </Field>
      <Field
        name={name}
        id="science"
        value="science"
        label="Science"
        isChecked={
          values && values.find((value: string) => value === "science")
        }
        component={CheckboxImageInputField}
      >
        <img src={scienceImage} alt="" />
      </Field>
      <Field
        name={name}
        id="sightseeing"
        value="sightseeing"
        label="Sightseeing"
        isChecked={
          values && values.find((value: string) => value === "sightseeing")
        }
        component={CheckboxImageInputField}
      >
        <img src={sightseeingImage} alt="" />
      </Field>
      <Field
        name={name}
        id="sports"
        value="sports"
        label="Sports"
        isChecked={values && values.find((value: string) => value === "sports")}
        component={CheckboxImageInputField}
      >
        <img src={sportsImage} alt="" />
      </Field>
      <Field
        name={name}
        id="technologies"
        value="technologies"
        label="Technologies"
        isChecked={
          values && values.find((value: string) => value === "technologies")
        }
        component={CheckboxImageInputField}
      >
        <img src={technologiesImage} alt="" />
      </Field>
      <Field
        name={name}
        id="travelling"
        value="travelling"
        label="Travelling"
        isChecked={
          values && values.find((value: string) => value === "travelling")
        }
        component={CheckboxImageInputField}
      >
        <img src={travellingImage} alt="" />
      </Field>
      <Field
        name={name}
        id="yoga"
        value="yoga"
        label="Yoga"
        isChecked={values && values.find((value: string) => value === "yoga")}
        component={CheckboxImageInputField}
      >
        <img src={yogaImage} alt="" />
      </Field>
    </>
  );
};

export default InterestCategories;
