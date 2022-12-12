import { SupabaseClient, User } from "@supabase/supabase-js";
import { Database } from "./database.types";

export async function GetNoteGroup({id, user, supabaseServerClient} : {id: string, user: User | null, supabaseServerClient: SupabaseClient<Database, "public">}) {
    const notes  = (await supabaseServerClient.from("note")
                                              .select()
                                              .eq('note_group_id', id))
                                              .data
            
    const noteGroups = (await supabaseServerClient.from("note_group")
                                                .select()
                                                .eq("base_note_group_id", id))
                                                .data
    return { notes, noteGroups }
}

export async function GetBaseNoteGroup({user, supabaseServerClient} : { user: User | null, supabaseServerClient: SupabaseClient<Database, "public">}) {
    const baseNoteGroup = (await supabaseServerClient.from("note_group")
                                                     .select("id")
                                                     .is("base_note_group_id", null)
                                                    //  .eq('user_id', user?.id) // not showing shared files yet
                                                     .single())
                                                     .data
    return baseNoteGroup;
}