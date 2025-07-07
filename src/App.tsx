import { useEffect, useRef, useState } from "react";
import bibleData from "./bible.json";
const bible = bibleData as Record<string, string>;
import toast, { Toaster } from "react-hot-toast";

type BibleEntry = {
	index: string;
	value: string;
};

import { getVersion } from "@tauri-apps/api/app";

export default function App() {
	const [isTauri, setIsTauri] = useState(false);

	useEffect(() => {
		getVersion()
			.then(() => setIsTauri(true))
			.catch(() => setIsTauri(false));
	}, []);

	const _성경: { [key: string]: { short: string; p: number } } = {
		창세기: { short: "창", p: 50 },
		출애굽기: { short: "출", p: 40 },
		레위기: { short: "레", p: 27 },
		민수기: { short: "민", p: 36 },
		신명기: { short: "신", p: 34 },
		여호수아: { short: "수", p: 24 },
		사사기: { short: "삿", p: 21 },
		룻기: { short: "룻", p: 4 },
		사무엘상: { short: "삼상", p: 31 },
		사무엘하: { short: "삼하", p: 24 },
		열왕기상: { short: "왕상", p: 22 },
		열왕기하: { short: "왕하", p: 25 },
		역대상: { short: "대상", p: 29 },
		역대하: { short: "대하", p: 36 },
		에스라: { short: "스", p: 10 },
		느헤미야: { short: "느", p: 13 },
		에스더: { short: "에", p: 10 },
		욥기: { short: "욥", p: 42 },
		시편: { short: "시", p: 150 },
		잠언: { short: "잠", p: 31 },
		전도서: { short: "전", p: 12 },
		아가: { short: "아", p: 8 },
		이사야: { short: "사", p: 66 },
		예레미야: { short: "렘", p: 52 },
		예레미야애가: { short: "애", p: 5 },
		에스겔: { short: "겔", p: 48 },
		다니엘: { short: "단", p: 12 },
		호세아: { short: "호", p: 14 },
		요엘: { short: "욜", p: 3 },
		아모스: { short: "암", p: 9 },
		오바댜: { short: "옵", p: 1 },
		요나: { short: "욘", p: 4 },
		미가: { short: "미", p: 7 },
		나훔: { short: "나", p: 3 },
		하박국: { short: "합", p: 3 },
		스바냐: { short: "습", p: 3 },
		학개: { short: "학", p: 2 },
		스가랴: { short: "슥", p: 14 },
		말라기: { short: "말", p: 4 },
		마태복음: { short: "마", p: 28 },
		마가복음: { short: "막", p: 16 },
		누가복음: { short: "눅", p: 24 },
		요한복음: { short: "요", p: 21 },
		사도행전: { short: "행", p: 28 },
		로마서: { short: "롬", p: 16 },
		고린도전서: { short: "고전", p: 16 },
		고린도후서: { short: "고후", p: 13 },
		갈라디아서: { short: "갈", p: 6 },
		에베소서: { short: "엡", p: 6 }, // 오타 수정
		빌립보서: { short: "빌", p: 4 },
		골로세서: { short: "골", p: 4 },
		데살로니가전서: { short: "살전", p: 5 },
		데살로니가후서: { short: "살후", p: 3 },
		디모데전서: { short: "딤전", p: 6 },
		디모데후서: { short: "딤후", p: 4 },
		디도서: { short: "디", p: 3 },
		빌레몬서: { short: "몬", p: 1 },
		히브리서: { short: "히", p: 13 },
		야고보서: { short: "약", p: 5 },
		베드로전서: { short: "벧전", p: 5 },
		베드로후서: { short: "벧후", p: 3 },
		요한일서: { short: "요일", p: 5 },
		요한이서: { short: "요이", p: 1 },
		요한삼서: { short: "요삼", p: 1 },
		유다서: { short: "유", p: 1 },
		요한계시록: { short: "계", p: 22 },
	};

	const [성경, set성경] = useState("");
	const [장, set장] = useState(0);
	const [시작절, set시작절] = useState(0);
	const [끝절, set끝절] = useState(0);
	const [canFind, setCanFind] = useState(false);
	const [결과, set결과] = useState<BibleEntry[]>([]);
	const textRef = useRef<HTMLDivElement>(null);

	const 찾기 = () => {
		if (!canFind) return;

		const json = _성경[성경]?.short || 성경;
		console.log(json);
		set결과([]);

		const list: BibleEntry[] = [];

		for (let i = 장; i <= 장; i++) {
			for (let j = 시작절; j <= 끝절; j++) {
				const value = {
					index: `${j}`,
					value: bible[`${json}${i}:${j}`],
				};

				if (!value.value) {
					if (value.value !== "" && value.value !== undefined) {
						toast.error("성경 구절이 잘못 입력되었습니다.");
						break;
					} else {
						continue;
					}
				}

				list.push(value);
			}
		}

		console.log(list);
		set결과(list);

		if (list.length > 0) {
			toast.success("성경 구절을 찾았습니다.");
		}
	};

	useEffect(() => {
		set성경((prev) => prev.trim());
		setCanFind(
			성경.trim() !== "" && 장 !== 0 && 시작절 !== 0 && 끝절 !== 0
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
						<ol
							type="1"
							start={parseInt(결과[0].index || "1")}
							className="list-decimal"
						>
							{결과.map((item, index_) => (
								<li
									key={`${item}${index_}`}
									className="list-item"
								>{`${item.value}`}</li>
							))}
						</ol>
					</div>
				</div>
			)}
			<div className="mt-50 flex flex-col items-center">
				<div className="flex gap-4 items-center">
					{!isTauri && (
						<a
							className="text-sm text-neutral-500 hover:underline"
							href="https://github.com/corche/bibleSearch/releases/"
							target="_self"
						>
							프로그램 다운로드
						</a>
					)}
					<a
						className="text-sm text-neutral-500 hover:underline"
						href="mailto:mail@corche.me"
						target="_blank"
					>
						mail@corche.me
					</a>
				</div>
				<div className="text-xs text-neutral-300 pointer-events-none">
					Powered by Woojin.
				</div>
			</div>
		</div>
	);
}
