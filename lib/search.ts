import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export async function GetSearchResult({ searchTerm, supabaseServerClient }: { searchTerm: string , supabaseServerClient: SupabaseClient<Database, "public">}) {

    const  {data} = await supabaseServerClient
                            .from('note')
                            .select()
                            .textSearch('fts', searchTerm);
    return data
}
