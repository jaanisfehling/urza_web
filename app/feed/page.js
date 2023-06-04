import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Feed() {
    const { data, error, isLoading } = useSWR('/api/profile-data', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex flex-col space-y-2">
            {data.map(function(msg, i) {
                return <p key={i}>{msg}</p>;
            })}
        </div>
    );
}