import { useEffect, useRef, useState } from "react";
import bibleData from "./bible.json";
const bible = bibleData as Record<string, string>;
import toast, { Toaster } from "react-hot-toast";

type BibleEntry = {
	index: string;
	value: string;
	number?: string;
	text?: string;
};

export default function Search() {
	const [성경, set성경] = useState("");
	const [장, set장] = useState(0);
	const [시작절, set시작절] = useState(0);
	const [끝절, set끝절] = useState(0);
	const [canFind, setCanFind] = useState(false);
	const [결과, set결과] = useState<BibleEntry[]>([]);
	const textRef = useRef<HTMLDivElement>(null);

	const 찾기 = () => {
		console.log(`${성경}${장}${시작절}${끝절}${canFind}`);
		console.log("asdf");
		if (!canFind) return;
		set결과([]);

		const bibleContent =
			typeof bible === "object" ? Object.values(bible)[1] : null;
		const book =
			bibleContent &&
			(bibleContent as any)["books"]?.find(
				(b: any) => b.name === 성경 || b.abbreviation === 성경,
			);

		if (book === undefined) {
			toast.error("성경 구절이 존재하지 않습니다.");
			return;
		}
		set결과(book["chapters"][장 - 1]["verses"].slice(시작절 - 1, 끝절 - 1));

		if (
			book["chapters"][장 - 1]["verses"].slice(시작절 - 1, 끝절 - 1)
				.length > 0
		) {
			toast.success("성경 구절을 찾았습니다.");
		} else {
			toast.error("성경 구절이 존재하지 않습니다.");
		}
	};

	useEffect(() => {
		set성경((prev) => prev.trim());
		setCanFind(
			성경.trim() !== "" && 장 !== 0 && 시작절 !== 0 && 끝절 !== 0,
		);
	}, [성경, 장, 시작절, 끝절]);

	// useEffect로 keyup 등록도 여기에 추가 가능

	return (
		<div className="flex flex-col items-center">
			<Toaster />
			<div className="font-bold text-2xl mt-30">성경 구절 검색기</div>

			<div className="p-4 border bg-neutral-100 border-neutral-300/80 w-fit mt-10 rounded-xl flex flex-col gap-5">
				<div className="flex gap-8 items-center">
					<div>
						<div className="flex gap-3 [&_label]:block [&_label]:text-xs [&_label]:text-neutral-500 [&_label]:mb-1 [&_label]:w-full [&_input]:placeholder:text-neutral-300 [&_input]:px-4 [&_input]:py-2 [&_input]:border [&_input]:border-neutral-200/90 [&_input]:bg-neutral-200/40 [&_input]:rounded-lg [&_input]:outline-none [&_input]:focus:bg-neutral-200/0 [&_input]:hover:bg-neutral-200/0">
							<div>
								<label htmlFor="tjdrud">성경</label>
								<input
									id="tjdrud"
									placeholder="예)창세기"
									className="w-32"
									value={성경}
									onChange={(e) => set성경(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="wkd">장</label>
								<input
									id="wkd"
									type="number"
									min="1"
									placeholder="1"
									className="w-20"
									value={장 || ""}
									onChange={(e) =>
										set장(Number(e.target.value))
									}
								/>
							</div>
							<div>
								<label htmlFor="wjf">절</label>
								<input
									id="wjf"
									type="number"
									min="1"
									placeholder="1"
									className="w-20"
									value={시작절 || ""}
									onChange={(e) =>
										set시작절(Number(e.target.value))
									}
								/>
							</div>
						</div>
					</div>
					<div className="text-xl font-bold text-neutral-400">~</div>
					<div>
						<div className="flex gap-3 [&_label]:block [&_label]:text-xs [&_label]:text-neutral-500 [&_label]:mb-1 [&_label]:w-full [&_input]:placeholder:text-neutral-300 [&_input]:px-4 [&_input]:py-2 [&_input]:border [&_input]:border-neutral-200/90 [&_input]:bg-neutral-200/40 [&_input]:rounded-lg [&_input]:outline-none [&_input]:focus:bg-neutral-200/0 [&_input]:hover:bg-neutral-200/0">
							<div>
								<label htmlFor="wjf">절</label>
								<input
									id="wjf"
									type="number"
									min="1"
									placeholder="1"
									className="w-20"
									value={끝절 || ""}
									onChange={(e) =>
										set끝절(Number(e.target.value))
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<button
					disabled={!canFind}
					onClick={찾기}
					className="px-4 py-2 bg-[#87CBB8] text-neutral-100 rounded-lg cursor-pointer hover:bg-[#4DB296] transition-color duration-200 disabled:bg-neutral-300"
				>
					검색
				</button>
			</div>
			{결과.length > 0 && (
				<div
					className="mt-10 px-10 select-text w-[80vw] max-w-[1000px]"
					ref={textRef}
				>
					<div className="mt-4 list-decimal">
						{결과.map((item, index_) => (
							<div key={`${item["number"]}${index_}`}>
								<div>{`${item["number"]}.  ${item["text"]}`}</div>
								{/* <ol
									type="1"
									start={parseInt(item["number"] || "1")}
									className="list-decimal"
								>
									<li className="list-item">{`${item["text"]}`}</li>
								</ol> */}
							</div>
						))}
					</div>
				</div>
			)}
			<div className="text-xs text-neutral-200 mt-50 mb-30 pointer-events-none">
				Powered by Woojin.
			</div>
		</div>
	);
}
