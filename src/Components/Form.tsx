import "bootstrap/dist/css/bootstrap.css";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { categories } from "../App";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

const schema = z.object({
  description: z.string().min(1, { message: "Please fill in the description" }),
  amount: z
    .number({ invalid_type_error: "Please enter valid amount" })
    .min(0, { message: "Amount must be positive" }),
  category: z.string().nonempty({ message: "Please choose a category" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  expenses: Expense[];
  onInclude: (item: Expense) => void;
}

const Form = ({ expenses, onInclude }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    const formDataObject = {
      id: expenses.length + 1,
      description: data.description,
      amount: data.amount,
      category: data.category,
    };
    console.log(expenses);

    onInclude(formDataObject);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger"> {errors.description.message} </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="text"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger"> {errors.amount.message} </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-control"
          >
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger"> {errors.category.message} </p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
