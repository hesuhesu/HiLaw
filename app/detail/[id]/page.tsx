import axios from 'axios';

const API: string = process.env.NEXT_PUBLIC_API_NUMBER as string;

export default async function Detail(id: number) {
    
    const response = await axios.get(`${API}${200300}`);
    const data = response.data.PrecService;
    
    return (
        <div>
            <p>판례정보일련번호 : {data.판례정보일련번호}</p>
            <p>판시사항 : {data.판시사항}</p>
        </div>
    )
}