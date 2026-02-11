import * as Yup from "yup";

export const bookFormSchema = Yup.object({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  isbn: Yup.string()
    .trim()
    .nullable()
    .test(
      "isbn-13",
      "ISBN must be exactly 13 digits",
      (value) => {
        if (!value || value.trim() === "") return true; 
        const digitsOnly = value.replace(/\D/g, "");
        return digitsOnly.length === 13;
      }
    ),
  languageId: Yup.number().nullable(),
  genreIds: Yup.array()
    .of(Yup.number().required())
    .min(1, "At least one genre is required")
    .required(),
  selectedAuthors: Yup.array()
    .min(1, "At least one author is required")
    .required(),
  coverCount: Yup.number()
    .min(1, "At least one cover is required")
    .required(),
});

export type BookFormValues = Yup.InferType<typeof bookFormSchema>;
