import Todo from "../Todo/Todo";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const Todos = () => {
  const array = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.loading.loading);
  // console.log(array);

  return loading ? (
    <Loader />
  ) : (
    <div
      className={
        array.length === 0
          ? "h-full flex justify-center items-center"
          : array.length <= 2
          ? " p-12 grid grid-cols-[repeat(auto-fit,_minmax(300px,_450px))] gap-8"
          : " p-12 max-sm:p-4 grid grid-cols-[repeat(auto-fit,_minmax(300px,_450px))] max-lg:grid-cols-1 gap-8 justify-center max-lg:justify-normal"
      }>
      {array.length === 0 ? (
        <h1 className="text-4xl text-gray-800">No Todos</h1>
      ) : (
        array.map((todo) => <Todo key={todo.id} todo={todo} todoId={todo.id} />)
      )}
    </div>
  );
};

export default Todos;
