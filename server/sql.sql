drop table note

CREATE TABLE note
(
    id serial NOT NULL,
    content text NULL,
    created_at timestamp NULL DEFAULT now()
);

COMMENT ON table note IS 'The note';
COMMENT ON column note.id IS 'The note ID';
COMMENT ON column note.content IS 'Text content of the note' ;

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
