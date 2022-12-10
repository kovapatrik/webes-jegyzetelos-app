import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "./database.types";

export async function GetNote({id, user, supabaseServerClient} : {id: string, user: User | null, supabaseServerClient: SupabaseClient<Database, "public">}) {
    const note  = (await supabaseServerClient.from("note")
                                             .select()
                                             .eq('id', id)
                                             .single())
                                             .data

    const userPerm = (await supabaseServerClient.from("note_perm")
                                              .select()
                                              .eq('note_id', id)
                                              .eq('user_id', user?.id)
                                              .single())
                                              .data

    const allPerms = (await supabaseServerClient.from("note_perm")
                                                  .select()
                                                  .eq('note_id', id))
                                                  .data
    return { note, userPerm, allPerms }
}