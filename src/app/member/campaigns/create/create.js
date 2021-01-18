import React from 'react';

import CampaignCreationForm from './form';
import {autoCompleter } from './auto-complete';

const tinymce_config = {
    content_css: 'create.css',
    autoresize_bottom_margin: 25,
    autoresize_overflow_padding: 25,
    browser_spellcheck: true,
    default_link_target: "_blank",
    file_picker_callback: () => {

    },
    file_picker_types: 'file',
    fullpage_default_doctype: "<!DOCTYPE html>",
    fullpage_default_encoding: "UTF-8",
    height: 500,
    images_reuse_filename: true,
    images_upload_url: 'http://localhost:5000/campaigns/uploads/image',
    image_uploadtab: true,
    menubar: false,
    placeholder: 'Create a campaign...',
    plugins: 'autolink autosave code fullpage fullscreen hr image imagetools link lists preview spellchecker wordcount quickbars',
    setup: autoCompleter,
    toolbar: `undo redo | formatselect fontsizeselect bold italic strikethrough forecolor backcolor alignleft aligncenter alignright alignjustify numlist bullist  blockquote |
        quickimage link hr restoredraft  spellchecker wordcount | preview  code  fullscreen`,
    toolbar_mode: 'sliding',
    toolbar_sticky: false,
    
}

const CreateCampaign = () => {
    return <CampaignCreationForm config = {tinymce_config} />
}

export default CreateCampaign;