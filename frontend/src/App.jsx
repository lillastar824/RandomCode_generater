import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import classnames from "classnames";
import toast, { Toaster } from "react-hot-toast";

import API from "./api";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const code = searchParams.get("code") || "";
      try {
        const response = await API.getUser(code);
        setUser(response.data.user);
        setTodoList(response.data.todoList);
        if (code) {
          setSearchParams({});
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchUser();
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await API.createTodo(data);
      if (response) {
        setTodoList([...todoList, response.data.todo]);
        toast("Successfully created new todo");
        reset({
          content: "",
        });
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.errors);
    }
  };
  const deleteTodo = async (_id) => {
    try {
      const response = await API.deleteTodo(_id);
      toast("deleted successfully");
      setTodoList(todoList.filter((item) => item._id != _id));
    } catch (e) {
      toast("error occurs: " + e.response.data.errors);
    }
  };

  const updateTodo = async (_id, isCompleted) => {
    try {
      const response = await API.updateTodo({ _id, isCompleted });
      setTodoList(
        todoList.map((item) => (item._id == _id ? response.data.updated : item))
      );
    } catch (e) {
      toast(e.reponse.data.errors);
    }
  };

  return (
    <div className="App bg-teal-50">
      <h1 className="text-4xl text-center pt-5">Backbar Recruiting</h1>

      <div className="w-full flex items-center justify-center font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4">
          <div>
            <div>Your code: {user ? user.code : ""}</div>
            {todoList.map((todo) => {
              return (
                <div className="flex mb-4 items-center" key={todo._id}>
                  <p
                    className={classnames("w-full", {
                      "line-through text-green-600": todo.isCompleted,
                    })}
                  >
                    Data: {todo.content}
                  </p>

                  {!todo.isCompleted && (
                    <button
                      className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-600"
                      onClick={() => {
                        updateTodo(todo._id, true);
                      }}
                    >
                      Done
                    </button>
                  )}
                  {todo.isCompleted && (
                    <button
                      className="flex-no-shrink whitespace-nowrap p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-600 border-gray-500 hover:bg-gray-600"
                      onClick={() => {
                        updateTodo(todo._id, false);
                      }}
                    >
                      Not Done
                    </button>
                  )}
                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
                    onClick={() => deleteTodo(todo._id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center gap-2">
                <label>New:</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                  placeholder="Add Todo"
                  {...register("content", { required: true })}
                />
                <button
                  type="submit"
                  className="flex-no-shrink p-2 border-2 rounded text-center text-teal-400 border-teal-400 hover:text-white hover:bg-teal-400 min-w-[100px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <PuffLoader color="#36d7b7" size={25} />
                  ) : (
                    "Save Entry"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
