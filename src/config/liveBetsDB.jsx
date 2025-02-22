// Vegas Database
import vegas_database from "./supabaseClient";


const fetchLiveBetsData = async (setLiveBetsData, setErrorMessage, setIsDataLoading) => {
    const { data, error } = await vegas_database
        .from("live_bets")
        .select()
        .order("id", { ascending: true })
        

    if (error) {
        console.log(error);
        setErrorMessage(error);
    }

    if (data) {
        setErrorMessage(null);
        setLiveBetsData(data);
        setIsDataLoading(false);
    }
}


const deleteLowestId = async () => {
    const { data, error } = await vegas_database
        .from("live_bets")
        .select("id")
        .order('id', { ascending: true })
        .limit(1)

    if (error) {
        console.log(error);
        return
    }

    if (data) {
        const oldBetId = data[0].id;

        const { error: deleteError } = await vegas_database
            .from("live_bets")
            .delete()
            .eq("id", oldBetId)
        
        if (deleteError) {
            console.error(deleteError);
        }
    }
}


const updateLiveBetsData = async (liveBetsData, setLiveBetsData, latestBet) => {

    deleteLowestId()

    const { data, error } = await vegas_database
        .from("live_bets")
        .insert({ 
            username: latestBet.username, 
            game_name: latestBet.game_name, 
            multiplier: latestBet.multiplier, 
            payout: latestBet.payout
        })
        .select()

    if (error) {
        console.log(error);
    }

    if (data) {
        setLiveBetsData(data);
    }
}


const realtimeBets = (setLiveBetsData, setErrorMessage, setIsDataLoading) => {
    const channel = vegas_database
        .channel()
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "live_bets"
            },
            (payload) => {
                fetchLiveBetsData(setLiveBetsData, setErrorMessage, setIsDataLoading);
            }
        )
        .subscribe()
}


export default { fetchLiveBetsData, updateLiveBetsData, realtimeBets }