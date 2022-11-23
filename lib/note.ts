import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "./database.types";

export async function GetNote({id, user, supabaseServerClient} : {id: string, user: User | null, supabaseServerClient: SupabaseClient<Database, "public">}) {
    const note  = (await supabaseServerClient.from("note")
                                                     .select('title, data, created_at, last_modify')
                                                     .eq('id', id)
                                                     .single())
                                                     .data
    const perms = (await supabaseServerClient.from("note_perm")
                                                .select('user_id, view_perm, edit_perm')
                                                .eq('note_id', id)
                                                .neq('user_id', user?.id))
                                                .data
    return { note, perms }
}