import { useContext } from "react";
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);
  const opinionAction = async (preState, formData) => {
    const data = Object.fromEntries(formData.entries());
    const { userName, title, body } = data;

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title is too small!");
    }

    if (!userName.trim()) {
      errors.push("Please write your name!");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 char!");
    }

    if (errors.length > 0) {
      return {
        errors,
        values: {
          userName,
          title,
          body,
        },
      };
    }

    await addOpinion({
      userName,
      title,
      body,
    });

    return {
      errors: null,
    };
  };

  const [{ errors, values }, formAction] = useActionState(
    opinionAction,
    {
      error: null,
    }
  );
  return (
    <div id='new-opinion'>
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className='control-row'>
          <p className='control'>
            <label htmlFor='userName'>Your Name</label>
            <input
              type='text'
              id='userName'
              name='userName'
              defaultValue={values?.userName}
            />
          </p>

          <p className='control'>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              id='title'
              name='title'
              defaultValue={values?.title}
            />
          </p>
        </div>
        <p className='control'>
          <label htmlFor='body'>Your Opinion</label>
          <textarea
            id='body'
            name='body'
            rows={5}
            defaultValue={values?.body}></textarea>
        </p>

        {errors && (
          <ul className='errors'>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <Submit/>
        {/* <p className='actions'>
          <button type='submit'>Submit</button>
        </p> */}
      </form>
    </div>
  );
}
