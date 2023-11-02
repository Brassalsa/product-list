import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Paging = ({ size = Infinity }: { size?: number }) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 0;
  const router = useRouter();

  function handleNext() {
    if (+page * 5 + 5 >= size) return;
    const next = +page + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", next.toString());
    router.push("?" + params.toString());
  }
  function handleBack() {
    if (+page <= 0) return;
    const back = +page - 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", back.toString());
    router.push("?" + params.toString());
  }
  return (
    <div className="flex gap-4 mx-auto justify-center py-5">
      <button
        className="bg-slate-500 text-white px-4 py-2 
       rounded-md hover:bg-slate-400 disabled:opacity-10"
        onClick={handleBack}
        disabled={+page <= 0}
      >
        Back
      </button>
      <button
        className="bg-slate-500 text-white px-4 py-2 
       rounded-md hover:bg-slate-400 disabled:opacity-10"
        onClick={handleNext}
        disabled={+page * 5 + 5 >= size}
      >
        Next
      </button>
    </div>
  );
};

export default Paging;
