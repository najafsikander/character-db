import { Link } from '@tanstack/react-router'

type link ={
    name:string,
    route:string
}
const links:[link] = [
    {
        name:'Rick & Morty',
        route:'rickMorty'
    }
]
const Header = () => {
  return (
    <>
      <header className="w-full flex justify-between px-5 py-2 font-bold text-slate-500">
        <h3 className="text-slate-900 border-2 border-slate-900 rounded-xl px-2 cursor-pointer">
            <Link to="/">Character-DB</Link>
        </h3>
        <ul>
            {links.map((link:link) => <li key={link.name}><Link to={link.route}>{link.name}</Link></li>)}
        </ul>
      </header>
    </>
  );
}
export default Header
