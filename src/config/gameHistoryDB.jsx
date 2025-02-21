// Vegas Database
import vegas_database from "./supabaseClient";


const fetchGameHistoryData = async (gameName, setHistoryData) => {
    const { data, error } = await vegas_database
        .from("game_history")
        .select()
        .eq("game_name", gameName)
        .single()

    if (error) {
        console.log(error);
    }

    if (data) {
        setHistoryData(data.history_data.rouletteHistory);

        switch (gameName) {
            case "roulette":
                setHistoryData(data.history_data.rouletteHistory);
                break

            case "coin flip":
                setHistoryData(data.history_data.coinFlipHistory);
                break
        }
    }
}


const updateGameHistoryData = async (gameName, historyData) => {

    let newHistoryData = {}

    switch (gameName) {
        case "roulette":
            newHistoryData = {
                rouletteHistory: historyData
            }
            break

        case "coin flip":
            newHistoryData = {
                coinFlipHistory: historyData
            }
            break
    }


    const { data, error } = await vegas_database
        .from("game_history")
        .update({ history_data: newHistoryData })
        .select()
        .eq("game_name", gameName)
    
    if (error) {
        console.log(error);
    }
}


export default { fetchGameHistoryData, updateGameHistoryData }