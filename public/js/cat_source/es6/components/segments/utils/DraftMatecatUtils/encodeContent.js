import createNewEntitiesFromMap from "./createNewEntitiesFromMap";
import linkEntities from "./linkEntities";
import beautifyEntities from "./beautifyEntities";
import {EditorState} from 'draft-js';

/**
 *
 * @param editorState
 * @param plainText - text to analyze when editor is empty
 * @returns {*|EditorState} editorStateModified - An EditorState with all known tags treated as entities
 */
const encodeContent = (originalEditorState, plainText = '') => {

    // Create entities
    const entitiesFromMap = createNewEntitiesFromMap(originalEditorState, plainText);
    let {contentState, tagRange} = entitiesFromMap;

    // Apply entities to EditorState
    let editorState = EditorState.push(originalEditorState, contentState, 'apply-entity');
    // Link each openTag with its closure using entity key, otherwise tag are linked with openTagId/closeTagId
    /*contentState = linkEntities(editorState);
    editorState = EditorState.push(originalEditorState, contentState, 'change-block-data');*/
    // Replace each tag text with a placeholder
    contentState = beautifyEntities(editorState);
    editorState = EditorState.push(originalEditorState, contentState, 'change-block-data');

    return {editorState, tagRange};
};

export default encodeContent;
