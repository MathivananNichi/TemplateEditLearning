// To parse this data:
//
//   import { Convert, TemplateModel } from "./file";
//
//   const templateModel = Convert.toTemplateModel(json);

export interface TemplateModel {
    selectedImageList:             any[];
    selectedTemplate:              SelectedTemplate;
    selectedContentTemplate:       null;
    productEntity:                 ProductEntity;
    price:                         Price;
    fileModel:                     null;
    isFreeEditor:                  boolean;
    isEditTemplate:                null;
    kindEntity:                    null;
    sizeEntity:                    SizeEntity;
    printEntity:                   null;
    printEntityApparel:            null;
    colorEntity:                   null;
    pageEntity:                    null;
    homeMainSubItemEntity:         HomeMainSubItemEntity;
    droppedCoverImage:             null;
    allContentTemplates:           any[];
    templatePageList:              null;
    selectedAssetIds:              null;
    selectedImagePathToAssetIdMap: null;
    photoframe_width:              null;
    photoframe_height:             null;
    isSingleSelection:             boolean;
    selectedCoverImage:            null;
    selectedHardCoverSheet:        null;
    selectedTemplateList:          SelectedTemplate[];
    isHardCoverRight:              boolean;
    buttonSizeResponse:            null;
    warningMap:                    null;
    coverSizeEntity:               null;
}

export interface HomeMainSubItemEntity {
    item_name:          string;
    item_code:          string;
    item_apply:         string;
    item_expire:        string;
    item_sort_order:    number;
    item_img:           string;
    item_text:          string;
    item_popup_img:     ItemPopupImg[];
    cart_type:          number;
    production_system:  number;
    size_flg:           boolean;
    page_flg:           boolean;
    color_flg:          boolean;
    kind_flg:           boolean;
    print_area_flg:     boolean;
    shipping_date_home: string;
    shipping_date_shop: string;
    campaign_flg:       boolean;
    design_skip_flg:    boolean;
    max_select_count:   number;
}

export interface ItemPopupImg {
    item_popup_img_no:   number;
    item_popup_img_name: string;
    item_popup_img:      null;
}

export interface Price {
    price_apply:        string;
    price_expire:       string;
    sales_price:        number;
    sales_price_in_tax: number;
    jancode:            string;
}

export interface ProductEntity {
    product_name:         string;
    product_code:         string;
    size_id:              string;
    page_id:              string;
    color_id:             string;
    kind_id:              string;
    print_area_id:        string;
    product_apply:        string;
    product_expire:       string;
    product_sort_order:   number;
    product_img:          string;
    product_text:         string;
    design_category_id:   string;
    text_flg:             boolean;
    trim_flg:             boolean;
    min_image_long_size:  number;
    min_image_short_size: number;
    max_image_long_size:  number;
    max_image_short_size: number;
    max_image_size_byte:  number;
    comp_data_resolution: number;
    comp_data_extension:  string;
    body_img:             any[];
    edit_scr_body_img:    any[];
    template_code:        string;
    product_type_array:   null;
    product_img_mtl:      string;
    product_img_obj:      string;
    product_img_uv_map:   string;
    ext_template_code:    string;
}

export interface SelectedTemplate {
    design_category_id:                         string;
    template_pattern_id:                        string;
    template_code:                              string;
    template_name:                              string;
    template_img:                               string;
    template_thumb_img:                         string;
    template_3d_thumb_img:                      null;
    template_thumb_bottom_list_img:             string;
    template_on_top_img:                        string;
    template_img_update_date:                   string;
    template_thumb_img_update_date:             string;
    template_thumb_bottom_list_img_update_date: string;
    template_on_top_img_update_date:            null;
    default_font_size:                          number;
    min_font_size:                              number;
    photoframe_count:                           number;
    textframe_count:                            number;
    template_apply:                             string;
    template_expire:                            string;
    photo_frame:                                PhotoFrame[];
    text_frame:                                 TextFrame[];
    print_area_width:                           number;
    print_area_height:                          number;
    product_size_id:                            string;
    cover_size_id:                              null;
    print_area_id:                              null;
    kind_id:                                    null;
    stamp_flg:                                  boolean;
    preview_position_width:                     number;
    preview_position_height:                    number;
    preview_position_x:                         number;
    preview_position_y:                         number;
    no_print_area_top:                          number;
    no_print_area_bottom:                       number;
    no_print_area_left:                         number;
    no_print_area_right:                        number;
    edit_scr_position_x:                        number;
    edit_scr_position_y:                        number;
    edit_scr_position_width:                    number;
    edit_scr_position_height:                   number;
    edit_template_Id:                           null;
    stampList:                                  null;
    thumbnailImagePath:                         null;
    productItemJsonEntity:                      null;
    homeMainSubItemEntity:                      null;
    templateSavedDateTime:                      null;
    text_Draft:                                 null;
    hardcover_id:                               null;
    generatedImagePath:                         null;
    product_args:                               null;
    template_rl_img:                            null;
    template_area_width:                        null;
    template_area_height:                       null;
    print_area_x:                               null;
    print_area_y:                               null;
    sheet_no:                                   null;
    default_font_color_id:                      string;
    downscaledSize:                             null;
}

export interface PhotoFrame {
    photoframe_no:              number;
    photoframe_x:               number;
    photoframe_rl_x:            null;
    photoframe_y:               number;
    photoframe_width:           number;
    photoframe_height:          number;
    photoframe_aspect_ratio_id: string;
    default_mask_img:           string;
    draftEditImagePath:         null;
}

export interface TextFrame {
    textframe_no:                   number;
    textframe_x:                    number;
    textframe_rl_x:                 null;
    textframe_y:                    number;
    textframe_width:                number;
    textframe_height:               number;
    default_comment:                string;
    default_textframe_angle:        number;
    max_length:                     null;
    priority_default_font_size:     null;
    priority_default_font_color_id: null;
}

export interface SizeEntity {
    kind_id:                 null;
    product_size_id:         string;
    product_size_name:       string;
    product_size_apply:      string;
    product_size_expire:     string;
    product_size_sort_order: number;
    product_size_img:        string;
    button_type:             string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toTemplateModel(json: string): TemplateModel {
        return JSON.parse(json);
    }

    public static templateModelToJson(value: TemplateModel): string {
        return JSON.stringify(value);
    }
}
