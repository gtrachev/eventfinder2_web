import React from "react";
import { Field } from "formik";
import CheckboxImageInputField from "../../utils/formik/CheckboxImageInputField";
const artsImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/artsInterest_yytjms.png`;
const cookingImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/cookingInterests_mlt5fu.png`;
const diyImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/diyInterest_zlabbw.png`;
const educationImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/educationInterest_ednm9p.png`;
const fitnessImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/fitnessInterest_dezphd.png`;
const hikingImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/hikingInterest_mid9ys.png`;
const historyImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/historyInterest_gq3y0b.png`;
const itImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/itInterest_jazjmz.png`;
const literatureImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/literatureInterest_vvbfjz.png`;
const musicImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/musicInterest_x7yrt6.png`;
const politicsImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/politicsInterest_p9fzpz.png`;
const scienceImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/scienceInterest_y1uspj.png`;
const sightseeingImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/sightseeingInterest_j9s8qc.png`;
const sportsImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732075/interestImages/sportsInterest_lxypaq.png`;
const technologiesImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/technologiesInterest_gp1mvz.png`;
const travellingImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/travellingInterest_jgcm06.png`;
const yogaImage = `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/v1645732076/interestImages/yogaInterest_ujrbyk.png`;

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
