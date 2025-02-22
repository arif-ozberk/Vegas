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


const deleteOldBet = async (liveBetsData) => {

    const oldBetId = liveBetsData[0].id

    const { data, error } = await vegas_database
        .from("live_bets")
        .delete()
        .select()
        .eq("id", oldBetId)

    if (error) {
        console.log(error);
    }
}


const updateLiveBetsData = async (liveBetsData, setLiveBetsData, latestBet) => {

    deleteOldBet(liveBetsData)

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


export default { fetchLiveBetsData, updateLiveBetsData }