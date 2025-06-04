// yyyy.mm.dd 포맷으로 변경
export default function getYmd(date: Date) {
  let y = date.getFullYear().toString();
  let m = (date.getMonth() + 1).toString();
  let d = date.getDate().toString();

  if (d.length === 1) d = "0" + d;

  if (m.length === 1) m = "0" + m;

  return y + "." + m + "." + d;
}
