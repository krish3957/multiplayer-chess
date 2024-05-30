import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


const Landing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <img src="https://media.istockphoto.com/id/182807740/ro/fotografie/mas%C4%83-de-%C8%99ah.jpg?s=612x612&w=0&k=20&c=m2cwAvLziXaG1_pcPK49CtMBBtu7Qsmr8MH1j1-07D0=" className="object-cover" />
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-4xl">
                            Play Chess With The Players Around The World
                        </h1>
                        <Button disabled={false} onClick={() => {
                            navigate('/game');
                        }}>
                            Play
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;